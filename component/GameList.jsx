import { useContext } from '@/pages/_app';
import { playHistory } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function GameList({ sortBy, type, name, displayMode }) {
    const { tagData, devData, gameData } = useContext();
    const [sortedList, setSortedList] = useState([]);
    const [title, setTitle] = useState("");
    const router = useRouter();

    const getData = () => {
        if (!sortBy || !type || !name || !displayMode) return;

        if (type === "tag" && tagData[name]) setTitle(tagData[name]?.fullName);
        else if (type === "dev" && devData[name]) setTitle(`By ${devData[name]?.name}`);
        else {
            // Handle the case where tagData[name] or devData[name] does not exist
            return;
        }
        let sortedList = [];
        for (let item in gameData) {
            if (gameData[item].sticky || playHistory.includes(item)) continue;

            if (name) {
                if (type === "tag" && !gameData[item].tags.includes(name)) continue;
                else if (type === "dev" && gameData[item].dev !== name) continue;
            }

            let temp = { id: item, ratingValue: sortBy === "rating" ? gameData[item].ratingValue : gameData[item].plays };
            sortedList.push(temp);
        }
        sortedList.sort((a, b) => b.ratingValue - a.ratingValue);

        // Draw Sticky Games
        for (let item in gameData) {
            if (!gameData[item].sticky || playHistory.includes(item)) continue;

            if (name) {
                if (type === "tag" && !gameData[item].tags.includes(name)) continue;
                else if (type === "dev" && gameData[item].dev !== name) continue;
            }

            let temp = { id: item, ratingValue: 0 };
            sortedList.unshift(temp);
        }

        if (displayMode === "short") {
            sortedList = sortedList.slice(0, 4);
        }


        setSortedList(sortedList);
    }

    useEffect(() => {
        getData();
    }, [gameData]);

    if (!Object.keys(gameData).length) return;

    return (
        <div style={{width: '100%', minWidth: "80vw", padding:"1px", height:"100%", minHeight: "220px"}}>
            {displayMode === "short" ? (
                <div style={{ textAlign: "left" }}>
                    <h2 style={{ display: "inline-block" }}>
                        <Link href={`/${type}/${name}`} style={{ textDecoration: "none" }}>{title}</Link>
                    </h2>
                    <span style={{ fontSize: "14px", textDecoration: "underline", cursor: "pointer" }} onClick={() => router.push(`/${type}/${name}`)}>(More)</span>
                </div>
            ) : (
                <h2>{title}</h2>
            )}


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