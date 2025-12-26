import { getCreative, getCreatives } from "../src/services/creatives";
import assert from "assert";

describe("getCreatives", () => {
    it("Offset -1", async () => {
        await assert.rejects(
            getCreatives(-1),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset string", async () => {
        await assert.rejects(
            getCreatives("2" as any),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset float", async () => {
        await assert.rejects(
            getCreatives(3.14),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset Infinity", async () => {
        await assert.rejects(
            getCreatives(Infinity),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset empty", async () => {
        const response = await getCreatives();
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Offset 0", async () => {
        const response = await getCreatives(0);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Limit -1", async () => {
        await assert.rejects(
            getCreatives(undefined, -1),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit string", async () => {
        await assert.rejects(
            getCreatives(undefined, "2" as any),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit float", async () => {
        await assert.rejects(
            getCreatives(undefined, 3.14),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit Infinity", async () => {
        await assert.rejects(
            getCreatives(undefined, Infinity),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit empty", async () => {
        const response = await getCreatives(0);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Limit 1", async () => {
        const response = await getCreatives(undefined, 1);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });
});

describe("getCreative", () => {
    it("Exists ID", async () => {
        const response = await getCreative(1);
        const keys = [
            "id",
            "author",
            "links",
            "date_created"
        ];
        
        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("ID -1", async () => {
        await assert.rejects(
            getCreative(-1),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID is empty", async () => {
        await assert.rejects(
            getCreative(undefined),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID float", async () => {
        await assert.rejects(
            getCreative(1.14),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID string", async () => {
        await assert.rejects(
            getCreative("1" as any),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID Infinity", async () => {
        await assert.rejects(
            getCreative(Infinity),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID 9999", async () => {
        const response = await getCreative(9999);
        assert.equal(response, null);
    });
});