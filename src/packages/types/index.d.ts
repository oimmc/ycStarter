/**
 * FeUI
 */

// Dialog
export interface IDialogOptions {
	show: boolean
	title?: string
	content: string
	cancelText?: string
	cancelFun?: () => void
	okText?: string
	okFun?: () => void
}

// MaskTips
export interface IMaskTipsOptions {
	show?: boolean
	title?: string
	content?: any
	btnTxt?: string
}
