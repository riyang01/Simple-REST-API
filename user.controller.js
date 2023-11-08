import fs from "node:fs";

const controller = {
  get: (req, res) => {
    fs.readFile("src/store/users.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      const users = JSON.parse(data);
      return res.status(200).json({ users: users });
    });
  },
  post: (req, res) => {
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
      return res
        .status(400)
        .json({ message: "Username/Password/Fullname is required" });
    }

    fs.readFile("src/store/users.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const users = JSON.parse(data);
      const user = {
        Id: users.length,
        Fullname: fullname,
        Username: username,
        Password: password,
      };
      const updateData = [...users, user];
      fs.writeFile(
        "src/store/users.json",
        JSON.stringify(updateData),
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
          } else {
            return res
              .status(200)
              .json({ message: "New user added succesfully." });
          }
        },
      );
    });
  },
  put: (req, res) => {
    const id = req.params.id;
    return res.json("Put");
  },
};

export default controller;
