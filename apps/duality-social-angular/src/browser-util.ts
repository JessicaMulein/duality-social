export class BrowserUtil {
    /**
     * Checks if the application is running inside an iframe.
     */
    public static isInIframe(): boolean {
        return window.parent !== window;
    }

    /**
     * Checks if the application is running inside a popup window.
     */
    public static isInPopup(): boolean {
        return !!window.opener && window.opener !== window;
    }
}
