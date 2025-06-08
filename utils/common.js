export const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort(); //sorted to get same room if user 1 opens the chat room or user 2 opens the chat room. Sorting will create the same id for both the users to get into the same chat room.
    const roomId = sortedIds.join("-");
    return roomId;
};

export const formatDate = (date) => {
    var day = date.getDate();
    var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dev",
    ];
    var month = monthNames[date.getMonth()];

    var formattedDate = day + " " + month;
    return formattedDate;
};
