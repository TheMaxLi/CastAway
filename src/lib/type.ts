export interface LocationData {
	latitude: number;
	longitude: number;
	altitude: number | null;
	timestamp: string | null;
}

export type GPSRef = 'N' | 'S' | 'E' | 'W';
