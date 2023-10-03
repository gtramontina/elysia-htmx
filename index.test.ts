import Elysia from "elysia";
import { HxSwap, htmx } from "./index.ts";
import { describe, expect, it } from "bun:test";

describe("request headers", () => {
	describe("HX-Request", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-request: ${hx.request}`);

		it("hx.request is false when the header isn't true", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-request: false");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Request": "anything but true" },
					}),
				);
				expect(await response.text()).toBe("hx-request: false");
			}
		});

		it("hx.request is true when the header is true", async () => {
			const response = await app.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-Request": "true" },
				}),
			);

			expect(await response.text()).toBe("hx-request: true");
		});
	});

	describe("HX-Boosted", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-boosted: ${hx.boosted}`);

		it("hx.boosted is false when the header isn't true", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-boosted: false");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Boosted": "anything but true" },
					}),
				);
				expect(await response.text()).toBe("hx-boosted: false");
			}
		});

		it("hx.boosted is true when the header is true", async () => {
			const response = await app.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-Boosted": "true" },
				}),
			);

			expect(await response.text()).toBe("hx-boosted: true");
		});
	});

	describe("HX-Current-URL", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-current-url: ${hx.currentURL}`);

		it("hx.currentURL holds the value of the header", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-current-url: ");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Current-URL": "some url" },
					}),
				);
				expect(await response.text()).toBe("hx-current-url: some url");
			}
		});
	});

	describe("HX-History-Restore-Request", () => {
		const app = new Elysia()
			.use(htmx())
			.get(
				"/",
				({ hx }) => `hx-history-restore-request: ${hx.historyRestoreRequest}`,
			);

		it("hx.historyRestoreRequest is false when the header isn't true", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-history-restore-request: false");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-History-Restore-Request": "anything but true" },
					}),
				);
				expect(await response.text()).toBe("hx-history-restore-request: false");
			}
		});

		it("hx.historyRestoreRequest is true when the header is true", async () => {
			const response = await app.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-History-Restore-Request": "true" },
				}),
			);

			expect(await response.text()).toBe("hx-history-restore-request: true");
		});
	});

	describe("HX-Prompt", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-prompt: ${hx.prompt}`);

		it("hx.prompt holds the value of the header", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-prompt: ");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Prompt": "user response" },
					}),
				);
				expect(await response.text()).toBe("hx-prompt: user response");
			}
		});
	});

	describe("HX-Target", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-target: ${hx.target}`);

		it("hx.target holds the value of the header", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-target: ");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Target": "#element-id" },
					}),
				);
				expect(await response.text()).toBe("hx-target: #element-id");
			}
		});
	});

	describe("HX-Trigger-Name", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-trigger-name: ${hx.triggerName}`);

		it("hx.triggerName holds the value of the header", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-trigger-name: ");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Trigger-Name": "triggered element name" },
					}),
				);
				expect(await response.text()).toBe(
					"hx-trigger-name: triggered element name",
				);
			}
		});
	});

	describe("HX-Trigger", () => {
		const app = new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => `hx-trigger: ${hx.trigger}`);

		it("hx.trigger holds the value of the header", async () => {
			{
				const response = await app.handle(new Request("https://dummy.com/"));
				expect(await response.text()).toBe("hx-trigger: ");
			}

			{
				const response = await app.handle(
					new Request("https://dummy.com/", {
						headers: { "HX-Trigger": "triggered element id" },
					}),
				);
				expect(await response.text()).toBe("hx-trigger: triggered element id");
			}
		});
	});
});

describe("response headers", () => {
	it("allows defining HX-Location", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.setLocation("https://dummy.com/new-location"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Location")).toBe(
			"https://dummy.com/new-location",
		);
	});

	it("allows defining HX-Push-Url", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.pushURL("https://dummy.com/new-location"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Push-Url")).toBe(
			"https://dummy.com/new-location",
		);
	});

	it("allows defining HX-Redirect", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.redirect("https://dummy.com/new-location"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Redirect")).toBe(
			"https://dummy.com/new-location",
		);
	});

	it("allows setting HX-Refresh", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.refresh())
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Refresh")).toBe("true");
	});

	it("allows defining HX-Replace-Url", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.replaceURL("https://dummy.com/new-location"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Replace-Url")).toBe(
			"https://dummy.com/new-location",
		);
	});

	it("allows defining HX-Reswap", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.reswap("innerHTML"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Reswap")).toBe("innerHTML");
	});

	it("allows defining HX-Retarget", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.retarget("#new-target"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Retarget")).toBe("#new-target");
	});

	it("allows defining HX-Reselect", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.reselect("#new-target"))
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Reselect")).toBe("#new-target");
	});

	it("allows defining HX-Trigger", async () => {
		{
			const response = await new Elysia()
				.use(htmx())
				.get("/", ({ hx }) => hx.triggerEvent("event"))
				.handle(new Request("https://dummy.com/"));
			expect(response.headers.get("HX-Trigger")).toBe("event");
		}
		{
			const response = await new Elysia()
				.use(htmx())
				.get("/", ({ hx }) => hx.triggerEvent({ event: { some: "data" } }))
				.handle(new Request("https://dummy.com/"));
			expect(response.headers.get("HX-Trigger")).toBe(
				JSON.stringify({ event: { some: "data" } }),
			);
		}
		{
			const response = await new Elysia()
				.use(htmx())
				.get("/", ({ hx }) =>
					hx.triggerEvent({ event1: { some: "data" }, event2: "data" }),
				)
				.handle(new Request("https://dummy.com/"));
			expect(response.headers.get("HX-Trigger")).toBe(
				JSON.stringify({ event1: { some: "data" }, event2: "data" }),
			);
		}
	});

	it("allows setting HX-Trigger-After-Settle", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.triggerEventAfterSettle())
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Trigger-After-Settle")).toBe("true");
	});

	it("allows setting HX-Trigger-After-Swap", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.triggerEventAfterSwap())
			.handle(new Request("https://dummy.com/"));
		expect(response.headers.get("HX-Trigger-After-Swap")).toBe("true");
	});

	it("allows disabling response cache when HX-Request is true", async () => {
		const response = await new Elysia()
			.use(htmx({ disableCache: true }))
			.get("/", () => "ok")
			.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-Request": "true" },
				}),
			);
		expect(response.headers.get("Cache-Control")).toBe(
			"no-cache, no-store, must-revalidate",
		);
	});
});

describe("hx.isHTMX", () => {
	it("is false when neither HX-Request nor HX-Boosted are true", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.isHTMX)
			.handle(new Request("https://dummy.com/"));
		expect(await response.text()).toBe("false");
	});

	it("is true when HX-Request is true", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.isHTMX)
			.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-Request": "true" },
				}),
			);
		expect(await response.text()).toBe("true");
	});

	it("is true when HX-Boosted is true", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.isHTMX)
			.handle(
				new Request("https://dummy.com/", {
					headers: { "HX-Boosted": "true" },
				}),
			);
		expect(await response.text()).toBe("true");
	});
});

describe("hx.stopPolling", () => {
	it("sets the response status to 286", async () => {
		const response = await new Elysia()
			.use(htmx())
			.get("/", ({ hx }) => hx.stopPolling())
			.handle(new Request("https://dummy.com/"));
		expect(response.status).toBe(286);
	});
});
