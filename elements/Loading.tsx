import styles from './Loading.module.scss';
import React from "react";
import loadingAnimation from "../assets/loading-animation.json"
import Lottie from 'react-lottie';
import classNames from "classnames";

const Loading: React.FC<{
    value: boolean,
    size?: number,
    lottieClassName?: string
}> = ({
          value,
          children,
          size = 32,
          lottieClassName
      }) => {
    return (
        <>
            {
                !!value === true ?
                    <div className={classNames([styles.lottie, lottieClassName])}>
                        <Lottie
                            height={size}
                            width={size}
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: loadingAnimation,
                                renderer: 'canvas',
                            }}
                        />
                    </div> : children
            }
        </>
    )
}

export default Loading
