import { useState } from "react";
import ListOfPosts from "./all_user_activities/ListOfPosts";
import { User } from "../interfaces/types";

    interface Props {
        user: User
    }

function UserActivities({user}: Props) {
    //a list of all the possible activities a user can have
    const userActivities: string[] = ["Posts", "Other Stuff"]
    
    //the currently selected activity
    const [currentActivity, setCurrentActivity] = useState<string>("Posts")

    //amount of content within activity
    const [activitiesAmount, setActivitiesAmount] = useState<number>(0)
    function getActivitiesAmount(activitiesAmount: number) {
        setActivitiesAmount(activitiesAmount)
    }
    return (
        <>
        <div className="bg-blue-200 rounded-xl xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-full max-sm:w-full pt-10 border-gray-400">
            <div>
                <ul className="flex space-x-8 md:gap-6 text-[16pt] px-8">
                {userActivities.map((activity) => (
                    <>
                        <li className={`${currentActivity == activity ? "gap-3" : "pb-3"} flex flex-col items-center justify-center cursor-pointer`} onClick={()=>{setCurrentActivity(activity)}}><button className="font-semibold text-blue-900">{activity}</button>{currentActivity == activity ? <hr className="border-none rounded-xl bg-blue-900 w-full h-1" /> : <></>}</li>
                    </>
                ))}
                </ul>
            </div>

            <div className="bg-blue-100 rounded-b-xl py-10 px-5 w-full">
                {/* Don't show the title of the user activity if 'Other Stuff' is selected */}
                {currentActivity != "Other Stuff" && <p className="text-blue-950 text-[28pt] pl-2 pb-5">{currentActivity} ({activitiesAmount})</p>}

                {/* Show the user's posts if 'Posts' is selected */}
                {currentActivity == "Posts" && <ListOfPosts user={user} setActivitiesAmount={getActivitiesAmount} />}

                {/* Show nothing if 'Other Stuff' is selected */}
                {currentActivity == "Other Stuff" && 
                <div className="text-center space-y-2 text-blue-900 py-52">
                    <p className="text-[40pt]">¯\_(ツ)_/¯</p>
                    <p className="text-[16pt]">Nothing to see here!</p>
                </div>
                }
            </div>
        </div>
        </>
    )
}

export default UserActivities;
