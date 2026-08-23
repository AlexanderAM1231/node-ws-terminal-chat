import net from 'node:net';

const clients = [];
const server = net.createServer((socket) => {
  clients.push(socket);
  socket.write("Welcome to the Terminal TCP Chat!\n");
  
  socket.on('data', (data) => {
    clients.forEach(c => {
      if (c !== socket) c.write(data);
    });
  });
  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(4000, () => {
  console.log("Chat server listening on port 4000...");
});
