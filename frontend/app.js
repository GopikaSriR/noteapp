const apiBaseUrl = "http://localhost:5000/api";

const login = async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch(`${apiBaseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    document.getElementById("auth").style.display = "none";
    document.getElementById("notes").style.display = "block";
    getNotes();
  } else {
    alert(data.message);
  }
};

const getNotes = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiBaseUrl}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const notes = await response.json();
  const noteList = document.getElementById("note-list");
  noteList.innerHTML = "";

  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    `;
    noteList.appendChild(noteDiv);
  });
};

const showCreateNote = () => {
  document.getElementById("notes").style.display = "none";
  document.getElementById("create-note").style.display = "block";
};

const createNote = async () => {
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiBaseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    document.getElementById("create-note").style.display = "none";
    document.getElementById("notes").style.display = "block";
    getNotes();
  } else {
    const data = await response.json();
    alert(data.message);
  }
};
