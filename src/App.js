import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "semantic-ui-react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [apiData, setAPIData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [employ, SetEmployee] = useState([]);
  const [udesignation, setUpdDesignation] = useState("");
  const [usalary, setUpdSalary] = useState("");
  const [uname, setUpdName] = useState("");

  const onSubmit = () => {
    axios
      .post(
        "https://sheet.best/api/sheets/f19bd107-088e-47a2-9e31-09ceffed3e10",
        {
          name,
          designation,
          salary,
        }
      )
      .then((data) => {
        SetEmployee([]);
        setName("");
        setDesignation("");
        setSalary("");
        setRefresh(data);
      });
  };

  const onUpdate = () => {
    axios
      .put(
        "https://sheet.best/api/sheets/f19bd107-088e-47a2-9e31-09ceffed3e10/name/" +
          uname,
        {
          name: uname,
          designation: udesignation,
          salary: usalary,
        }
      )
      .then((data) => {
        SetEmployee([]);
        setUpdName("");
        setUpdDesignation("");
        setUpdSalary("");
        setRefresh(data);
      });
  };

  const onRetrieve = (e, name) => {
    e.preventDefault();
    axios
      .get(
        "https://sheet.best/api/sheets/f19bd107-088e-47a2-9e31-09ceffed3e10/name/" +
          name
      )
      .then((response) => {
        SetEmployee(response.data);
        setUpdName(response.data[0].name);
        setUpdDesignation(response.data[0].designation);
        setUpdSalary(response.data[0].salary);
      });
  };

  const onDelete = (e, name) => {
    console.log("deletehi");
    e.preventDefault();
    axios
      .delete(
        "https://sheet.best/api/sheets/f19bd107-088e-47a2-9e31-09ceffed3e10/name/" +
          name
      )
      .then((response) => {
        SetEmployee([]);
        setRefresh(response);
      });
  };

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/f19bd107-088e-47a2-9e31-09ceffed3e10")
      .then((response) => {
        setAPIData(response.data);
      });
  }, [refresh]);

  return (
    <div>
      {employ.map((emp) => {
        return emp.name !== "" ? (
          <Form style={{ padding: 20 }}>
            <Form.Field>
              <label>Name</label>
              <input
                readOnly
                value={uname}
                onChange={(e) => setUpdName(e.target.value)}
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Designation</label>
              <input
                placeholder="Designation"
                value={udesignation}
                onChange={(e) => setUpdDesignation(e.target.value)}
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Salary</label>
              <input
                placeholder="Salary"
                value={usalary}
                onChange={(e) => setUpdSalary(e.target.value)}
              />
            </Form.Field>
            <Button type="submit" onClick={onUpdate}>
              Update
            </Button>
          </Form>
        ) : (
          <Form style={{ padding: 20 }}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Designation</label>
              <input
                placeholder="Designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Salary</label>
              <input
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Field>

            <Button type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        );
      })}

      {employ === undefined || employ === null || employ.length === 0 ? (
        <Form style={{ padding: 20 }}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Designation</label>
            <input
              placeholder="Designation"
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Salary</label>
            <input
              placeholder="Salary"
              onChange={(e) => setSalary(e.target.value)}
            />
          </Form.Field>

          <Button type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      ) : (
        ""
      )}

      <Table fixed style={{ padding: 20 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Designation</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Retrieve</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {apiData.map((data, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.designation}</Table.Cell>
                <Table.Cell>{data.salary}</Table.Cell>
                <Table.Cell>
                  <Button
                    type="submit"
                    onClick={(e) => onRetrieve(e, data.name)}
                  >
                    Retrieve
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button type="submit" onClick={(e) => onDelete(e, data.name)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
