import { constructUrl, post } from "..";

const fetchMock = jest.fn();

global.window.fetch = fetchMock;

describe('client utilities', () => {
    const endpoint = "https://target.com";

    describe('constructUrl', () => {

        it('should construct correct url from given arguments', () => {
            const expectedUrl = new URL(endpoint);

            expect(constructUrl(endpoint).toString()).toBe(expectedUrl.toString());
        });

        it('should construct correct url from given arguments and add search params', () => {
            const expectedUrl = new URL(endpoint);

            expectedUrl.searchParams.append('count', "1");

            expect(constructUrl(endpoint + '\?count=1').toString()).toBe(expectedUrl.toString());
        });
    });

    describe('post', () => {
        it('should return correct error if fetch threw an exception', async () => {
            const message = 'Error';
            fetchMock.mockImplementationOnce(() => { throw new Error(message) });
            const url = constructUrl(endpoint);

            const result = await post(url, {});

            expect(result.ok).toBe(false);
            expect(result.value).toBe(message);
        });

        it('should return correct error is fetch returned an error', async () => {
            fetchMock.mockImplementationOnce(() => new Error('Error'));
            const url = constructUrl(endpoint);

            const result = await post(url, {});

            expect(result.ok).toBe(false);
            expect(result.value).toBe("Request failed");
        });

        it('should return correct error if parsing value threw an exception', async () => {
            const message = 'Error';
            fetchMock.mockImplementationOnce(() => ({ ok: true, json: async () => { throw new Error(message) } }));
            const url = constructUrl(endpoint);

            const result = await post(url, {});

            expect(result.ok).toBe(false);
            expect(result.value).toBe(message);
        });

        it('should return result if request succeeded', async () => {
            fetchMock.mockImplementationOnce(() => ({ ok: true, json: async () => "Success" }));
            const url = constructUrl(endpoint);

            const result = await post(url, {});

            expect(result.ok).toBe(true);
            expect(result.value).toBe("Success");
        });
    });
});