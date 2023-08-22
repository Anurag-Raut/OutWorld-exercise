import { io, Socket } from 'socket.io-client';

// Ensure that URL is properly defined before using it
const URL = 'https://outworld-exercise-socket-server.onrender.com';

export const socket: Socket = io(URL);
