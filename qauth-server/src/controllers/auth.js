exports.checkApp = async (req, res) => {
	if (!req.body.nonce) {
		return res.status(400).json({ message: "must provide 'nonce'" });
	}
	const nonce = req.body.nonce;

	// TODO: Check that `nonce` is of correct format. If not, return error.
	// TODO: Check that `nonce` is used for first time. If it was used before, return error.

	if (!req.body.appToken) {
		return res.status(400).json({ message: "must provide 'appToken'" });
	}
	const appToken = req.body.appToken;

	// TODO: Retrieve app data based on `appToken`; if no such app found - return error.

	// TODO: Retrieve proper callback URL for app. Will be available as part of retrieved app data.
	const callbackUrl = 'http://localhost:3000/cb';

	// TODO: Write current `nonce` to table of "used nonces". We don't want the same auth URL used more than once.

	res.status(200).json({
		status: 'OK',
		nonce,
		appToken,
		callbackUrl,
	});
};

exports.getUser = async (req, res) => {
	if (!req.body.ssoToken) {
		return res.status(400).json({ message: "must provide 'ssoToken'" });
	}
	const ssoToken = req.body.ssoToken;

	// TODO: Check that `ssoToken` is actually valid at this time. If not, return error.

	// TODO: Retrieve user `first name` and `last name`.
	const firstName = 'Valera';
	const lastName = 'Rozuvan';

	res.status(200).json({
		status: 'OK',
		ssoToken,
		firstName,
		lastName,
	});
};
