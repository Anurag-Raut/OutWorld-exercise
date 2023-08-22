import { io, Socket } from 'socket.io-client';

// Ensure that URL is properly defined before using it
const URL = 'http://localhost:4000';

export const socket: Socket = io(URL);
