const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp();
exports.metaReplace  = functions.https.onRequest((req, res) => {
	const userAgent = req.headers['user-agent'].toLowerCase();
	let indexHTML = fs.readFileSync('./hosting/index.html').toString();
	const path = req.path ? req.path.split('/') : req.path;
	const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
	const metaPlaceholder = '<meta name="functions-insert-dynamic-meta">';

	const isBot = userAgent.includes('googlebot') ||
		userAgent.includes('yahoou') ||
		userAgent.includes('bingbot') ||
		userAgent.includes('baiduspider') ||
		userAgent.includes('yandex') ||
		userAgent.includes('yeti') ||
		userAgent.includes('yodaobot') ||
		userAgent.includes('gigabot') ||
		userAgent.includes('ia_archiver') ||
		userAgent.includes('facebookexternalhit') ||
		userAgent.includes('twitterbot') ||
		userAgent.includes('developers.google.com') ? true : false;

	if ((path && path.length > 1 && path[1] === 'until')) {
        const slug = path[2];
        
		admin.firestore().collection('countdowns').where('slug', '==', slug).get().then(countObj => {
			const org = countObj.docs[0].data();
			if (org) {
				org.slug = slug;
			}
			// indexHTML = indexHTML.replace(metaPlaceholder, getMeta(org));
			indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(org));
            res.status(200).send(indexHTML);
            return null;
		}).catch(error => {
            console.error(error);
            res.error(500);
        });
		return;
	}

	// optional - turn on caching: res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	// indexHTML = indexHTML.replace(metaPlaceholder, getMeta());
	indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph());
	res.status(200).send(indexHTML);
});


const defaultDesc = 'Quick, Whats the plan?';
const defaultTitle = "OMGWHEN | It's All Happening";
const defaultLogo = 'https://example.com/images/headerHQ.jpg';

const getOpenGraph = (org) => {
	let og = `<meta property="og:type" content="website" />`;

	if (!org) {
		og += `<meta property="og:title" content="${defaultTitle}" />`;
		og += `<meta property="og:description" content="${defaultDesc}" />`;
		og += `<meta property="og:image" content="${defaultLogo}" />`;
		og += `<meta property="og:url" content="https://omgwhen.io" />`;
		return og;
	}
	og += `<meta property="og:title" content="${org.headline}" />`;
	og += `<meta property="og:description" content="${org.description || defDesc}" />`;
	og += `<meta property="og:image" content="${org.bg_image || defLogo}" />`;
	og += `<meta property="og:url" content="https://omgwhen.io/until/${org.slug}" />`;
	return og;
};
