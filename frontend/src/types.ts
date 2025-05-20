export interface BioSample {
  id: number;
  type: string;
  sampling_location: string;
  sampling_date: string;
  sampling_operator: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  created_at: string;
  biosample: number;
}
