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

export const fetchBioSampleById = async (id: number): Promise<BioSample> => {
  try {
    const response = await fetch(`${API_URL}/biosamples/${id}/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching biosample details:", error);
    throw error;
  }
};

export const createBioSample = async (
  sample: Omit<BioSample, "id">
): Promise<BioSample> => {
  try {
    const response = await fetch(`${API_URL}/biosamples/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sample),
    });

    if (!response.ok) {
      throw new Error("Failed to create sample");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating sample:", error);
    throw error;
  }
};

export const updateBioSample = async (
  id: number,
  sample: Partial<BioSample>
): Promise<BioSample> => {
  try {
    const response = await fetch(`${API_URL}/biosamples/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sample),
    });

    if (!response.ok) {
      throw new Error("Failed to update sample");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating sample:", error);
    throw error;
  }
};

export const deleteBioSample = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/biosamples/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete sample");
};
