/**
 * Created by Nathan on 16/7/12.
 */
export default class Detector {
	public android = () => navigator.userAgent.match(/Android/i);
	public iOS = () => navigator.userAgent.match(/iPhone|iPod|iPad/i);
	public weixin = () => navigator.userAgent.match(/MicroMessenger/i);
	public appVersion = () => navigator.userAgent.split(' ')[1].split('/')[1];
};

const detector = new Detector();
export const nativeFunction = {
	// http://wiki.hn.com/pages/viewpage.action?title=3.x+Native+JavaScript+Interactions&spaceKey=mobile
	PAY: '_js_pay_unifier',
	SET_FORM: '_js_set_form',
	GET_FORM: '_js_form',
	HISTORY_BACK: '_js_back',
	HISTORY_DIRECT_BACK: '_js_direct_back',
	ALERT: '_js_alert',
	CONFIRM: '_js_interrupt',
	CALENDAR: '_js_calendar',
	MAP: '_js_map',
	TOGGLE_NAVIGATION: '_js_navigation_toggle',
	CALL_COMMENT: '_js_comment',
	SHARE: '_js_share',
	COPY_PASTE: '_js_pasteboard',
	LOGOUT: '_js_logout',
	TRANSACTION: '_js_transaction',
	TRANSACTION_CLOSE: '_js_transaction_close',
	TRANSACTION_TIPS: '_js_transaction_tips',
	OPEN_ACCOUNT: '_js_open_account',
	TRANSFER_IN: '_js_transfer_in',
	PRE_TRANSFER_IN: '_js_pre_transfer_in',
	TRANSACTION_FORGOT: '_js_transaction_forgot',
	SET_NAVIGATION: '_js_set_navigation_style',
	BOUNCE_TOGGLE: '_js_bounce_toggle',
	NAVIGATION_SHADOW_TOGGLE: '_js_navigation_shadow_toggle',
	DROPDOWN: '_js_dropdown',
	INPUT_FOCUS: '_js_input_focus',
	CERTIFICATE_UPLOAD: '_js_certificate_upload',
	CMBC_ACCOUNT_HOME: '_js_cmbc_account_home',
	OPEN_CMBC_ACCOUNT: '_js_open_cmbc_account',
	CMBC_GOBACK_SXC: '_js_cmbc_goback_sxc',
	CHECK_APP: '_js_check_app',
	OPEN_APP: '_js_open_app'
};

export const nativeCallbackDataType = {
	CONTACTS: 'contacts',
	CALENDAR: 'calendar',
	COMMENTS: 'comment',
	PASTEBOARD: 'pasteboard',
	ALERT: 'alert',
	TRANSACTION: 'transaction',
	TRANSACTION_CLOSE: 'transactionClose',
	TRANSACTION_TIPS: 'transaction_tips',
	OPEN_ACCOUNT: 'openAccount',
	TRANSFER_IN: 'transferIn',
	TRANSACTION_FORGOT: 'transactionForgot',
	OPEN_CMBC_ACCOUNT: 'openCMBCAccount',
	REFRESH_AMOUNT: 'refreshAmount',
	IS_INSTALL_APP: 'isInstallApp'
};

const appLink = {
	ios: {
		open: 'hnczb://h5',
		store: 'https://itunes.apple.com/cn/app/id1056496128'
	},
	android: {
		open: 'hnczb://h5',
		store: 'https://www.hnczb.com/m'
	}
};

const getAppLink = () => detector.iOS() ? appLink.ios : appLink.android;

export const openApp = (pageUrl: string) => {
	const link = getAppLink();
	// window.location.href = `${link.open}?url=${encodeURIComponent(pageUrl)}`;
	// window.setTimeout(() => {
	//     window.location.href = link.store;
	// }, 2000);
	location.href = `${link.open}?url=${encodeURIComponent(pageUrl)}`;

	let timerId: any = null
	timerId = setTimeout(() => {
		window.location.href = link.store;
	}, 3000);

	document.addEventListener('visibilitychange', function () {
		clearTimeout(timerId)
		// if (document.hidden) {
		//     clearTimeout(timerId)
		//     // href = link.store;
		// } else {
		//     // location = link.store;
		// }
	});
};

export const updateApp = () => {
	window.location.href = getAppLink().store
}

export const callNativeFunction = (functionName: any) => {
	return detector.iOS() ? (data: any) => { (process.env.NODE_ENV !== 'dev' && !!detector.appVersion()) && window.webkit.messageHandlers[functionName].postMessage(data) } : (data: any) => { (process.env.NODE_ENV !== 'dev' && !!detector.appVersion()) && window.hnczb[functionName](JSON.stringify(data)) };
}

export const isAppVersion = (main: any, secondary: any, thr: any) => {
	const version = detector.appVersion();
	if (version && parseInt(version.split('.')[0], 10) > main) {
		return true
	} else if (version && parseInt(version.split('.')[0], 10) === main && parseInt(version.split('.')[1], 10) > secondary) {
		return true
	} else if (version && parseInt(version.split('.')[0], 10) === main && parseInt(version.split('.')[1], 10) === secondary && parseInt(version.split('.')[2], 10)) {
		if (parseInt(version.split('.')[2], 10) >= thr) {
			return true
		}
	}
}
