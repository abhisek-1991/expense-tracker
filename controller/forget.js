const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Forgotpassword = require('../models/forgot_password');
const brevo = require('@getbrevo/brevo');


const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) {
            const id = uuidv4();
            console.log("line 15",id);
            await Forgotpassword.create({ id, active: true, userId: user.id });

            let defaultClient = brevo.ApiClient.instance;

            let apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

            let apiInstance = new brevo.TransactionalEmailsApi();
            let sendSmtpEmail = new brevo.SendSmtpEmail();
            
            sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = `<html><body><a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a></body></html>`;
;
sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
sendSmtpEmail.to = [
  { "email": email, "name": "sample-name" }
];
sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
  console.error(error);
});



        } else {
            throw new Error('User does not exist');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message, success: false });
    }
};









const resetpassword = async (req, res) => {
    try {
        const id = req.params.id;
        const forgotpasswordrequest = await Forgotpassword.findOne({ where: { id } });

        if (forgotpasswordrequest) {
            await forgotpasswordrequest.update({ active: false });

            return res.status(200).send(`
                <html>
                    <form action="/password/updatepassword/${id}" method="post">
                        <label for="newpassword">Enter New password</label>
                        <input name="newpassword" type="password" required></input>
                        <button type="submit">Reset password</button>
                    </form>
                </html>
            `);
        } else {
            return res.status(404).json({ error: 'Invalid or expired reset link', success: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
};

const updatepassword = async (req, res) => {
    try {
        const { newpassword } = req.body;
        const { resetpasswordid } = req.params;

        const resetpasswordrequest = await Forgotpassword.findOne({ where: { id: resetpasswordid } });

        if (resetpasswordrequest) {
            const user = await User.findOne({ where: { id: resetpasswordrequest.userId } });

            if (user) {
                const hashedPassword = await bcrypt.hash(newpassword, 10);
                await user.update({ password: hashedPassword });

                return res.status(200).json({ message: 'Password updated successfully', success: true });
            } else {
                return res.status(404).json({ error: 'No user found', success: false });
            }
        } else {
            return res.status(404).json({ error: 'Invalid or expired reset link', success: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
};

module.exports = {
    forgotpassword,
    resetpassword,
    updatepassword
};
