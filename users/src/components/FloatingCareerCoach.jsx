import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CareerCoach from "../assets/career-coach.png";

export default function FloatingCareerCoach({
    message,
    mood = "happy"
}) {

    const [blink, setBlink] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {

            setBlink(true);

            setTimeout(() => {

                setBlink(false);

            }, 180);

        }, 3500);

        return () => clearInterval(interval);

    }, []);

    const moodEmoji = {

        happy: "😊",

        teaching: "📖",

        thinking: "🤔",

        excited: "🎉"

    };

    return (

        <motion.div

            style={styles.container}

            initial={{
                opacity:0,
                x:100
            }}

            animate={{
                opacity:1,
                x:0
            }}

            transition={{
                duration:.6
            }}

        >

            <AnimatePresence mode="wait">

                <motion.div

                    key={message}

                    initial={{
                        opacity:0,
                        y:15
                    }}

                    animate={{
                        opacity:1,
                        y:0
                    }}

                    exit={{
                        opacity:0,
                        y:-15
                    }}

                    transition={{
                        duration:.25
                    }}

                    style={styles.bubble}

                >

                    <strong>

                        Tumelo {moodEmoji[mood]}

                    </strong>

                    <br/><br/>

                    {message}

                </motion.div>

            </AnimatePresence>

            <motion.div

                animate={{
                    y:[0,-10,0]
                }}

                transition={{
                    duration:3,
                    repeat:Infinity,
                    ease:"easeInOut"
                }}

            >

                <motion.img

                    src={CareerCoach}

                    alt="Tumelo"

                    animate={{
                        scaleY: blink ? .985 : 1
                    }}

                    transition={{
                        duration:.08
                    }}

                    style={styles.avatar}

                />

            </motion.div>

        </motion.div>

    );

}

const styles={

container:{

position:"fixed",

right:"35px",

bottom:"30px",

width:"260px",

zIndex:9999,

pointerEvents:"none"

},

avatar:{

width:"220px",

display:"block",

margin:"0 auto",

filter:"drop-shadow(0 18px 40px rgba(0,0,0,.25))"

},

bubble:{

background:"#fff",

padding:"20px",

borderRadius:"22px",

marginBottom:"18px",

fontSize:".95rem",

lineHeight:1.6,

boxShadow:"0 18px 50px rgba(0,0,0,.18)",

borderLeft:"6px solid var(--teal)",

color:"var(--navy)"

}

};
