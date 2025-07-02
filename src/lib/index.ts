import type { Tags } from 'exifreader';
import type { GPSRef } from './type';

export function dmsToDecimal(dmsArray: number[], ref: GPSRef) {
	if (!dmsArray || dmsArray.length !== 3) return null;

	const degrees = dmsArray[0];
	const minutes = dmsArray[1];
	const seconds = dmsArray[2];

	let decimal = degrees + minutes / 60 + seconds / 3600;

	if (ref === 'S' || ref === 'W') {
		decimal = -decimal;
	}

	return decimal;
}

export function extractLocation(exifData: Tags) {
	try {
	 const gpsLatitude = exifData.GPSLatitude?.value as number[] | undefined;
    const gpsLatitudeRef = exifData.GPSLatitudeRef?.value?.[0] as GPSRef | undefined;
    const gpsLongitude = exifData.GPSLongitude?.value as number[] | undefined;
    const gpsLongitudeRef = exifData.GPSLongitudeRef?.value?.[0] as GPSRef | undefined;
    
    if (!gpsLatitude || !gpsLongitude || !gpsLatitudeRef || !gpsLongitudeRef) {
      return null;
    }
    
    const latitude = dmsToDecimal(gpsLatitude, gpsLatitudeRef);
    const longitude = dmsToDecimal(gpsLongitude, gpsLongitudeRef);

		if (latitude === null || longitude === null) {
			return null;
		}

		return {
			latitude,
			longitude,
			altitude: exifData.GPSAltitude?.value || null,
			timestamp: exifData.GPSTimeStamp?.value || null
		};
	} catch (error) {
		console.error('Error extracting location:', error);
		return null;
	}
}
