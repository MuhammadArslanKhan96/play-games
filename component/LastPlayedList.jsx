import { useContext } from '@/pages/_app';
import { playHistory } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function LastPlayedList() {
    const { gameData } = useContext();
    const [sortedList, setSortedList] = useState([]);
    const router = useRouter();

    const getData = () => {
        if (playHistory.length === 0) return;
        setSortedList(playHistory.map(id => ({ id })));
    }

    useEffect(() => {
        getData();
    }, [gameData, playHistory]);

    return (
        <div style={{ width: '100%', minWidth: "80vw", padding: "1px", height: "100%", minHeight: "222px" }}>
            <h2 id="lastPlayedTitle" style={{opacity:sortedList.length ? "100%" : "0%"}}>Continue</h2>
            {sortedList.map(({ id: item }, idx) => {
                if (!gameData[item]) return "";

                var appLink = "/app/" + item;
                var playLink = "/play/" + item;

                var changedRatingValue = gameData[item].ratingValue;
                if (changedRatingValue % 1 === 0) changedRatingValue = `${changedRatingValue}.0`;

                var finalGameName = gameData[item].name;
                if (finalGameName.length >= 23) finalGameName = finalGameName.slice(0, 20) + `...`;

                return (
                    <div key={idx} className="thumbDiv">
                        <div onClick={() => router.push(playLink)}>

                            <Image loading='eager' priority width={222} height={138} style={{ cursor: "pointer", borderRadius: "12px", width: "100%", height: "100%" }} src={`https://playem.io/img/${item}.jpg`} alt={`Read Review: ${gameData[item].name}`} />
                            {
                                gameData[item].plays != 0 && (
                                    gameData[item].plays >= 1000000
                                        ?
                                        <div className="onlineDisplay">{gameData[item].plays / 1000000}M Online</div>
                                        : gameData[item].plays >= 1000 ?
                                            <div className="onlineDisplay">{gameData[item].plays / 1000}K Online</div>
                                            :
                                            <div className="onlineDisplay">{gameData[item].plays} Online</div>
                                )
                            }

                            <div className="ratingDisplay">{changedRatingValue}</div>
                            <div className="thumbDiv-name" style={{ maxWidth: "140px", height: "16px", overflow: "hidden", whiteSpace: "nowrap" }}>
                                <Link href={playLink} style={{ textDecoration: "none" }}>{gameData[item].name}</Link>
                            </div>
                        </div>
                        <div className="thumbDiv-moreInfo" onClick={() => router.push(appLink)}>
                            <b>...</b>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}