export const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyYWVmOTY4MS00YjhiLTQ1OTAtOTQxYS1lZjZhMjUyNThkMjQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyOTM4NzgyMCwiZXhwIjoxNzI5NDc0MjIwfQ.qGsL-hosVfFpxaNqZzZr9NmZgxeAjzdXa47u2eTGQGg"

export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch('https://api.videosdk.live/v2/rooms', {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  console.log(`Room ID: ${roomId}`);
  return roomId;
}