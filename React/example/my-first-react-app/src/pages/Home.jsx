import React from "react";
import * as motion from "motion/react-client"

function Home() {
    return (<>
        <h1>Welcome to the Home Page</h1>
        <center>
            <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />
        </center>
    </>);
}

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
}

export default Home;