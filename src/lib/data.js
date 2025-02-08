export async function getProjects() {
    const res = await fetch('http://localhost:8080/api/images', {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
}