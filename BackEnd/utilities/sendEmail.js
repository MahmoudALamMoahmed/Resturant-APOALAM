import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: "ititestapps@gmail.com",
        pass: "brku abbm sugn yqvl",
    },
});


const sendVerfication = async (email) => {
    const info = await transporter.sendMail({
        from: '"verify your account 👻" <ititestapps@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "verify ✔", // Subject line
        text: "please verify your email", // plain text body
        html: `
        <table>
            <tr>
                <th><b>welcome to our website</b></th>
            </tr>
            <tbody>
                <td>
                    <a href="http://localhost:3000/verifyEmail/${email}" style="text-decoration: none; padding: 10px; background-color: rgb(1, 1, 101); color: #fff; text-transform: capitalize; border-radius: 10px; margin: 10px;">Verify Account</a>
                </td>
            </tbody>
        </table>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}


export default sendVerfication;

