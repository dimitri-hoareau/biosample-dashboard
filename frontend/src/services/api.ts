import type { BioSample } from "../types";

const API_URL = "http://localhost:8000/api";

export const fetchBioSamples = async (): Promise<BioSample[]> => {
  try {
    const response = await fetch(`${API_URL}/biosamples/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching biosamples:", error);
    throw error;
  }
};
