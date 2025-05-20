import { useState, useEffect } from "react";
import { fetchBioSamples } from "../services/api.ts";
import type { BioSample } from "../types";

function BioSampleList() {
  const [samples, setSamples] = useState<BioSample[]>([]);

  useEffect(() => {
    const loadSamples = async () => {
      try {
        const data = await fetchBioSamples();
        setSamples(data);
      } catch (err) {
        console.error("Error loading samples:", err);
      }
    };

    loadSamples();
  }, []);

  return (
    <div>
      <h1>Biological Samples</h1>

      <table>
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Date</th>
            <th>Operator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr key={sample.id}>
              <td>SP-{sample.id}</td>
              <td>{sample.type}</td>
              <td>{sample.sampling_location}</td>
              <td>{sample.sampling_date}</td>
              <td>{sample.sampling_operator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BioSampleList;
