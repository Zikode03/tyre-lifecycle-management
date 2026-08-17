export type TyreHealthStatus = 'Healthy' | 'Attention' | 'Critical' | 'Unknown';
export type EvidenceConfidence = 'High' | 'Medium' | 'Low';
export type TreadEvidence = 'Measured' | 'Estimated' | 'Unknown';

export interface TyreHealthInput {
  measuredTreadMm?: number;
  measuredAt?: string;
  previousTreadMm?: number;
  previousTreadOdometerKm?: number;
  currentOdometerKm?: number;
  abnormalWear?: boolean;
  severeDefect?: boolean;
  rotationKmSince?: number;
  mileageStale?: boolean;
}

export interface TyreHealthResult {
  status: TyreHealthStatus;
  confidence: EvidenceConfidence;
  evidence: TreadEvidence;
  treadMm?: number;
  treadLabel: string;
  action: string;
  reason: string;
  isEstimate: boolean;
}

const CRITICAL_TREAD_MM = 2.2;
const ATTENTION_TREAD_MM = 3.5;
const ROTATION_INTERVAL_KM = 10_000;
// Prototype assumption only. Backend/configuration should eventually own this value.
const ESTIMATED_WEAR_MM_PER_10K_KM = 0.9;

export function evaluateTyreHealth(input: TyreHealthInput): TyreHealthResult {
  const hasMeasuredTread = typeof input.measuredTreadMm === 'number';

  if (hasMeasuredTread) {
    const tread = input.measuredTreadMm!;

    if (input.severeDefect || tread <= CRITICAL_TREAD_MM) {
      return {
        status: 'Critical', confidence: 'High', evidence: 'Measured', treadMm: tread,
        treadLabel: `${tread.toFixed(1)} mm`, action: 'Replacement inspection',
        reason: input.severeDefect ? 'A severe physical defect was recorded during inspection.' : `Verified tread is ${tread.toFixed(1)} mm and is at the critical review threshold.`,
        isEstimate: false,
      };
    }

    if (input.abnormalWear || tread <= ATTENTION_TREAD_MM) {
      return {
        status: 'Attention', confidence: 'High', evidence: 'Measured', treadMm: tread,
        treadLabel: `${tread.toFixed(1)} mm`, action: 'Book tread inspection',
        reason: input.abnormalWear ? 'Measured tread has an abnormal wear pattern that needs inspection.' : `Verified tread is approaching the review threshold at ${tread.toFixed(1)} mm.`,
        isEstimate: false,
      };
    }

    if ((input.rotationKmSince ?? 0) >= ROTATION_INTERVAL_KM) {
      return {
        status: 'Attention', confidence: 'High', evidence: 'Measured', treadMm: tread,
        treadLabel: `${tread.toFixed(1)} mm`, action: 'Rotation check',
        reason: `Tread is healthy, but the tyre has travelled ${Math.round((input.rotationKmSince ?? 0) / 1000)}k km since rotation.`,
        isEstimate: false,
      };
    }

    return {
      status: 'Healthy', confidence: 'High', evidence: 'Measured', treadMm: tread,
      treadLabel: `${tread.toFixed(1)} mm`, action: 'No immediate action',
      reason: 'Recent verified tread is above the attention threshold and no critical defect is recorded.',
      isEstimate: false,
    };
  }

  const canEstimate = !input.mileageStale && typeof input.previousTreadMm === 'number' && typeof input.previousTreadOdometerKm === 'number' && typeof input.currentOdometerKm === 'number' && input.currentOdometerKm >= input.previousTreadOdometerKm;

  if (canEstimate) {
    const travelledKm = input.currentOdometerKm! - input.previousTreadOdometerKm!;
    const estimatedWear = (travelledKm / 10_000) * ESTIMATED_WEAR_MM_PER_10K_KM;
    const estimate = Math.max(0, input.previousTreadMm! - estimatedWear);
    const rounded = Math.round(estimate * 10) / 10;
    const status: TyreHealthStatus = rounded <= CRITICAL_TREAD_MM ? 'Attention' : rounded <= ATTENTION_TREAD_MM ? 'Attention' : 'Healthy';

    return {
      status, confidence: 'Medium', evidence: 'Estimated', treadMm: rounded,
      treadLabel: `~${rounded.toFixed(1)} mm`, action: status === 'Healthy' ? 'Monitor wear' : 'Book tread inspection',
      reason: `Estimated from the last verified tread reading and ${travelledKm.toLocaleString()} km travelled since that reading. Physical inspection is required to confirm it.`,
      isEstimate: true,
    };
  }

  return {
    status: 'Unknown', confidence: 'Low', evidence: 'Unknown', treadLabel: 'Unknown',
    action: 'Request inspection',
    reason: 'There is not enough recent verified tread and mileage evidence to determine current tyre condition.',
    isEstimate: false,
  };
}
