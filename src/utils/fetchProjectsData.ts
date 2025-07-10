// Simulate fetching data from an API but fetch from a json file instead
export const fetchProjectsData = async () => {
  try {
    const response = await fetch(`/projects/projects.json`);
    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.statusText}`);
    }
    const projectData = await response.json();
    return projectData;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return [];
  }
};

export const fetchProjectById = async (id: string) => {
  try {
    const response = await fetch(`/projects/projects.json`);
    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.statusText}`);
    }
    const projectData = await response.json();
    return projectData.find((project: { id: string }) => project.id === id);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}
