module.exports=function(io){
  console.log(io);
   io.on('connection',function(socket){

        socket.on('send:message',function(data){

            socket.broadcast.emit('outgoing:message',data);
        });
   });

};
