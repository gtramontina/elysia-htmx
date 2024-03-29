import Elysia from "elysia";

type Options = {
	disableCache?: boolean;
};

export const htmx = ({ disableCache }: Options = {}) => {
	const app = new Elysia({ name: "htmx", seed: { disableCache } }).derive(
		{ as: "global" },
		({ request: { headers }, set }): HtmxContext => {
			return {
				hx: {
					request: headers.get("HX-Request") === "true",
					boosted: headers.get("HX-Boosted") === "true",
					historyRestoreRequest:
						headers.get("HX-History-Restore-Request") === "true",
					currentURL: headers.get("HX-Current-URL") ?? "",
					prompt: headers.get("HX-Prompt") ?? "",
					target: headers.get("HX-Target") ?? "",
					triggerName: headers.get("HX-Trigger-Name") ?? "",
					trigger: headers.get("HX-Trigger") ?? "",
					setLocation(url: string) {
						set.headers["HX-Location"] = url;
					},
					pushURL(url: string) {
						set.headers["HX-Push-Url"] = url;
					},
					redirect(url: string) {
						set.headers["HX-Redirect"] = url;
					},
					refresh() {
						set.headers["HX-Refresh"] = "true";
					},
					replaceURL(url: string) {
						set.headers["HX-Replace-Url"] = url;
					},
					reswap(value: HxSwap) {
						set.headers["HX-Reswap"] = value;
					},
					retarget(elementSelector: string) {
						set.headers["HX-Retarget"] = elementSelector;
					},
					reselect(elementSelector: string) {
						set.headers["HX-Reselect"] = elementSelector;
					},
					triggerEvent(event: string | Record<string, unknown>) {
						set.headers["HX-Trigger"] =
							typeof event === "string" ? event : JSON.stringify(event);
					},
					triggerEventAfterSettle() {
						set.headers["HX-Trigger-After-Settle"] = "true";
					},
					triggerEventAfterSwap() {
						set.headers["HX-Trigger-After-Swap"] = "true";
					},
					get isHTMX() {
						return (
							headers.get("HX-Request") === "true" ||
							headers.get("HX-Boosted") === "true"
						);
					},
					stopPolling() {
						set.status = 286;
					},
				},
			};
		},
	);

	if (disableCache) {
		app.on("request", ({ set, request: { headers } }) => {
			if (headers.get("HX-Request") === "true") {
				set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
			}
		});
	}

	return app;
};

export type HxSwap =
	| "innerHTML"
	| "outerHTML"
	| "beforebegin"
	| "afterbegin"
	| "beforeend"
	| "afterend"
	| "delete"
	| "none";

export type HtmxContext = {
	hx: Readonly<{
		// always true (when the request is via HTMX)
		request: boolean;

		// indicates that the request is via an element using hx-boost
		boosted: boolean;

		// true if the request is for history restoration after a miss in the local history cache
		historyRestoreRequest: boolean;

		// the current URL of the browser
		currentURL: string;

		// the user response to an hx-prompt
		prompt: string;

		// the id of the target element if it exists
		target: string;

		// the name of the triggered element if it exists
		triggerName: string;

		// the id of the triggered element if it exists
		trigger: string;

		// Allows you to do a client-side redirect that does not do a full page reload
		setLocation(url: string): void;

		// pushes a new url into the history stack
		pushURL(url: string): void;

		// can be used to do a client-side redirect to a new location
		redirect(url: string): void;

		// if set to “true” the client side will do a full refresh of the page
		refresh(): void;

		// replaces the current URL in the location bar
		replaceURL(url: string): void;

		// Allows you to specify how the response will be swapped. See hx-swap for possible values
		reswap(value: HxSwap): void;

		// A CSS selector that updates the target of the content update to a different element on the page
		retarget(elementSelector: string): void;

		// A CSS selector that allows you to choose which part of the response is used to be swapped in. Overrides an existing hx-select on the triggering element
		reselect(elementSelector: string): void;

		// allows you to trigger client side events, see the documentation for more info
		triggerEvent(event: string | Record<string, unknown>): void;

		// allows you to trigger client side events, see the documentation for more info
		triggerEventAfterSettle(): void;

		// allows you to trigger client side events, see the documentation for more info
		triggerEventAfterSwap(): void;

		// true if the request is via HTMX
		get isHTMX(): boolean;

		// https://htmx.org/docs/#polling
		stopPolling(): void;
	}>;
};
