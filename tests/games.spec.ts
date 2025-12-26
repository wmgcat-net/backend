import { getGame, getGames } from "../src/services/games";
import assert from "assert";

describe("getGames", () => {
    it("Offset -1", async () => {
        await assert.rejects(
            getGames(-1),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset string", async () => {
        await assert.rejects(
            getGames("2" as any),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset float", async () => {
        await assert.rejects(
            getGames(3.14),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset Infinity", async () => {
        await assert.rejects(
            getGames(Infinity),
            {
                name: "Error",
                message: "Offset is invalid"
            }
        );
    });

    it("Offset empty", async () => {
        const response = await getGames();
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Offset 0", async () => {
        const response = await getGames(0);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Limit -1", async () => {
        await assert.rejects(
            getGames(undefined, -1),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit string", async () => {
        await assert.rejects(
            getGames(undefined, "2" as any),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit float", async () => {
        await assert.rejects(
            getGames(undefined, 3.14),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit Infinity", async () => {
        await assert.rejects(
            getGames(undefined, Infinity),
            {
                name: "Error",
                message: "Limit is invalid"
            }
        );
    });

    it("Limit empty", async () => {
        const response = await getGames(0);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("Limit 1", async () => {
        const response = await getGames(undefined, 1);
        const keys = ["items", "total"];

        assert.deepStrictEqual(Object.keys(response), keys);
    });
});

describe("getGame", () => {
    it("Exists ID", async () => {
        const response = await getGame(1);
        const keys = [
            "id",
            "title",
            "description",
            "links",
            "date_created"
        ];
        
        assert.deepStrictEqual(Object.keys(response), keys);
    });

    it("ID -1", async () => {
        await assert.rejects(
            getGame(-1),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID is empty", async () => {
        await assert.rejects(
            getGame(undefined),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID float", async () => {
        await assert.rejects(
            getGame(1.14),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID string", async () => {
        await assert.rejects(
            getGame("1" as any),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID Infinity", async () => {
        await assert.rejects(
            getGame(Infinity),
            {
                name: "Error",
                message: "ID is invalid"
            }
        );
    });

    it("ID 9999", async () => {
        const response = await getGame(9999);
        assert.equal(response, null);
    });
});