import type { Song } from "comman/shared-types";
import prismaClient from "db/client";

export async function updateLastPlayedSong(roomId : string,song : Song) {
    await prismaClient.room.update({
        where : {
            Id : roomId
        },
        data : {
            lastPlayed : {
                create : {
                    title : song.title,
                    description : song.description,
                    thumbnail : song.thumbnail
                }
            }
        }
    })
}