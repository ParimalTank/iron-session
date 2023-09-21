import { withSessionRoute } from "../../lib/withSession";

const mockUsers = [
  {
    username: "Admin User",
    email: "admin@gmail.com"
  },
  {
    username: "Just User",
    email: "justuser@gmail.com"
  }
];


// use middleware to to send the cookies
export default withSessionRoute(
  async function handler(req, res) {
    switch (req.method) {
      case "POST":
        const { email } = req.body;
        const loggedInUsername = mockUsers.find(user => user.email === email);

        if (!loggedInUsername) {
          res.status(404).send("Can't find the user");
          break;
        }

        req.session.username = loggedInUsername.username;
        console.log(" req.session.username: ", req.session);
        await req.session.save(); // save the session

        res.status(200).send('Found the user');
        break;
      default:
        res.status(405).end(`${req.method} Not Allowed`);
        break;
    }
  }
);