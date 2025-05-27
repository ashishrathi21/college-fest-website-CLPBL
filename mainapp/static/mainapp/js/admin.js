const registrations = [
  { name: "Alex Johnson", event: "Short Film", status: "Approved", time: "2 hours ago" },
  { name: "Maya Patel", event: "Photography", status: "Pending", time: "3 hours ago" },
  { name: "Sam Wilson", event: "Coding", status: "Approved", time: "5 hours ago" },
  { name: "Priya Singh", event: "Debate", status: "Pending", time: "1 day ago" },
  { name: "Jake Miller", event: "Antakshari", status: "Approved", time: "1 day ago" }
];

const tableBody = document.getElementById("registrationsTable");
registrations.forEach(r => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${r.name}</td>
    <td>${r.event}</td>
    <td>${r.status === "Approved" ? "✅" : "⏳"} ${r.status}</td>
    <td>${r.time}</td>
    <td><a href="#">View</a>${r.status === "Pending" ? ' | <a href="#">Approve</a>' : ''}</td>
  `;
  tableBody.appendChild(tr);
});

new Chart(document.getElementById("registrationsChart"), {
  type: 'bar',
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: 'Registrations',
      data: [12, 19, 14, 23, 17, 24, 19],
      backgroundColor: '#3b82f6'
    }]
  }
});

new Chart(document.getElementById("popularEventsChart"), {
  type: 'bar',
  data: {
    labels: ["Short Film", "Photo", "Debate", "Coding", "Dance", "Antakshari"],
    datasets: [{
      label: 'Popularity',
      data: [10, 20, 7, 15, 9, 12],
      backgroundColor: '#22d3ee'
    }]
  }
});



function goToLogin() {
      window.location.href = "../login.html"; // replace with your page
    }