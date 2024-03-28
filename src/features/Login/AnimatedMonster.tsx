import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import monster2 from '../../img/idle/2.png';
import monster3 from '../../img/idle/3.png';
import monster4 from '../../img/idle/4.png';
import monster5 from '../../img/idle/5.png';
import monsterRead1 from '../../img/read/1.png';
import monsterRead2 from '../../img/read/2.png';
import monsterRead3 from '../../img/read/3.png';
import monsterRead4 from '../../img/read/4.png';
import monsterCover1 from '../../img/cover/1.png';
import monsterCover2 from '../../img/cover/2.png';
import monsterCover3 from '../../img/cover/3.png';
import monsterCover4 from '../../img/cover/4.png';
import monsterCover5 from '../../img/cover/5.png';
import monsterCover6 from '../../img/cover/6.png';
import monsterCover7 from '../../img/cover/7.png';
import monsterCover8 from '../../img/cover/8.png';

interface FormikValues {
    email: string;
    password: string;
    rememberMe: boolean;
}


export const AnimatedMonster: React.FC<{ formData: FormikValues }> = ({ formData }) => {
    const [monsterSrc, setMonsterSrc] = useState<string>('');
    const [followingMouse, setFollowingMouse] = useState<boolean>(true);
    const [isCovering, setIsCovering] = useState<boolean>(false);

    useEffect(() => {
        const handleInputFocus = () => {
            setFollowingMouse(false);
            setIsCovering(false);
        };

        const handleInputBlur = () => {
            setFollowingMouse(true);
            setIsCovering(false);
        };

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('focus', handleInputFocus);
                input.removeEventListener('blur', handleInputBlur);
            });
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (followingMouse) {
                const halfWidth = window.innerWidth / 2;
                const halfHeight = window.innerHeight / 2;

                if (e.clientX < halfWidth && e.clientY < halfHeight) {
                    setMonsterSrc(monster2);
                } else if (e.clientX < halfWidth && e.clientY > halfHeight) {
                    setMonsterSrc(monster3);
                } else if (e.clientX > halfWidth && e.clientY < halfHeight) {
                    setMonsterSrc(monster5);
                } else {
                    setMonsterSrc(monster4);
                }
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [followingMouse]);

    useEffect(() => {
        const handleInputEffect = () => {
            const inputLength = formData.email.length + formData.password.length;

            if (inputLength >= 0 && inputLength <= 5) {
                setMonsterSrc(monsterRead1);
            } else if (inputLength >= 6 && inputLength <= 14) {
                setMonsterSrc(monsterRead2);
            } else if (inputLength >= 15 && inputLength <= 20) {
                setMonsterSrc(monsterRead3);
            } else {
                setMonsterSrc(monsterRead4);
            }
        };

        handleInputEffect();
    }, [formData]);

    useEffect(() => {
        if (isCovering) {
            let coverInterval: NodeJS.Timeout;
            let frame = 1;

            coverInterval = setInterval(() => {
                setMonsterSrc(getCoverFrame(frame));
                frame++;
                if (frame > 8) {
                    clearInterval(coverInterval);
                }
            }, 60);

            return () => clearInterval(coverInterval);
        }
    }, [isCovering]);

    useEffect(() => {
        if (formData.password.length > 0) {
            setIsCovering(true);
        } else {
            setIsCovering(false);
        }
    }, [formData.password, setIsCovering]);

    const getCoverFrame = (frame: number) => {
        switch (frame) {
            case 1:
                return monsterCover1;
            case 2:
                return monsterCover2;
            case 3:
                return monsterCover3;
            case 4:
                return monsterCover4;
            case 5:
                return monsterCover5;
            case 6:
                return monsterCover6;
            case 7:
                return monsterCover7;
            case 8:
                return monsterCover8;
            default:
                return monsterCover1;
        }
    };

    return (
        <div>
            <img
                src={isCovering ? monsterCover8 : monsterSrc}
                id="monster"
                alt="Monster"
            />
        </div>
    );
};


AnimatedMonster.propTypes = {
    // @ts-ignore
    formData: PropTypes.object.isRequired,
};

