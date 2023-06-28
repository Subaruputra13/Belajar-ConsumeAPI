import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Members from "./components/members/members";
import Form from "./components/form/form";

const App = () => {
  const [member, setMember] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [formStatus, setFormStatus] = useState("create");
  const [memberId, setMemberId] = useState();

  // useEffect untuk mengambil data dari API menggunakan axios GET method (read) dan menyimpan data ke state member
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        setMember(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // handler untuk mengambil value dari form
  const handlerFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handlerLastName = (e) => {
    setLastName(e.target.value);
  };

  // handler untuk mengambil value dari form dan mengirim ke API menggunakan axios POST method (create) dan menambahkan data ke state member (update) dan mereset form (reset)
  const handlerSubmit = (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    var payload = {
      first_name: first_name,
      last_name: last_name,
    };

    // var url = "https://reqres.in/api/users";
    if (formStatus === "create") {
      addMember("https://reqres.in/api/users", payload);
    } else {
      editMember("https://reqres.in/api/users/${memberId}", payload);
    }
  };

  // fungsi untuk mengupdate user dengan id
  const editMember = (url, payload) => {
    axios.put(url, payload).then((response) => {
      const eMember = [...member];
      const indexMember = eMember.findIndex((member) => member.id === memberId);

      // mengganti data yang ada dalam state members dan index yang sesuai
      eMember[indexMember].first_name = response.data.first_name;
      eMember[indexMember].last_name = response.data.last_name;

      setMember(eMember); // Update state eMember

      setButtonDisabled(false);
      setFirstName(""); // Reset form
      setLastName("");
      setFormStatus("create");
    });
  };

  // fungsi untuk membuat user
  const addMember = (url, payload) => {
    axios
      .post(url, payload)
      .then((response) => {
        const members = [...member];
        members.push(response.data);
        setMember(members); // Update state member

        setButtonDisabled(false);
        setFirstName(""); // Reset form
        setLastName("");
        setFormStatus("create");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handler untuk edit button ketika ingin mengupdate data user
  const handlerButtonEdit = (member) => {
    setFirstName(member.first_name);
    setLastName(member.last_name);
    setFormStatus("edit");
    setMemberId(member.id);
  };

  // handler untuk delete button ketika ingin menghapus suatu data user
  const handlerButtonDelete = (id) => {
    var url = "https://reqres.in/api/users/${id}";
    axios
      .delete(url)
      .then((response) => {
        if (response.status === 204) {
          const dMmeber = [...member];
          const index = dMmeber.findIndex((member) => member.id === id);
          dMmeber.splice(index, 1);
          setMember(dMmeber);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Codepolitan DevSchool</h1>
        <div className="row" style={{ paddingTop: "10px" }}>
          {/* Kolom Member */}
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Member</h2>
            <div className="row">
              <Members
                members={member}
                handlerButtonEdit={(member) => handlerButtonEdit(member)}
                handlerButtonDelete={(id) => handlerButtonDelete(id)}
              />
            </div>
          </div>
          {/* End */}

          {/* Kolom Form */}
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Form {formStatus}</h2>
            <Form
              handlerSubmit={handlerSubmit}
              handlerFirstName={handlerFirstName}
              handlerLastName={handlerLastName}
              first_name={first_name}
              last_name={last_name}
              buttonDisabled={buttonDisabled}
            />
          </div>
          {/* End */}
        </div>
      </div>
    </>
  );
};

export default App;
