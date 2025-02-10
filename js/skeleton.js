export function createSkeletonCard() {
    const skeleton = document.createElement("div");
    skeleton.className = "col-md-4 mb-3";
    skeleton.innerHTML = `<div class="shadow-sm skeleton-card">`;
    return skeleton;
}

export function showSkeletons(container, count) {
    for (let i = 0; i < count; i++) {
        container.appendChild(createSkeletonCard());
    }
}

export function removeSkeletons() {
    document.querySelectorAll(".skeleton-card").forEach(skeleton => skeleton.remove());
}