import { Card } from "react-bootstrap";
import unliked_heart from "../../assets/unliked_heart.png";
import liked_heart from "../../assets/liked_heart.png"
import comment_icon from "../../assets/comment_icon.png";
import default_pfp from "../../assets/default_pfp.png";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Post, User } from "../../interfaces/types";

interface Props {
    user: User;
    setActivitiesAmount: (amount: number) => void;
}

function ListOfPosts({ user, setActivitiesAmount }: Props) {
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const postCategories: string[] = ["NEWS", "BLOG", "LITERATURE"];
    const [randomCategoriesForPosts, setRandomCategoriesForPosts] = useState<string[]>([]);
    const [postLikes, setPostLikes] = useState<Record<number, number>>({});
    const [hasLiked, setHasLiked] = useState<Record<number, boolean>>({});

    function getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        axios.get(`/posts`)
        .then(({data}) => {
            const postsByUser = data.filter((post: Post) => user?.id == post.userId)
            setUserPosts(postsByUser)
            setActivitiesAmount(postsByUser.length)
        }).catch(error => {
            console.log(error)
            toast.error(`There has been a critical error from retrieving this user's posts. Please try again.`)
        })
    }, [user])

    useEffect(() => {
        if (userPosts?.length) {
        const randomCategoriesList = userPosts.map(() => postCategories[getRandomInteger(0, postCategories.length - 1)]);
        setRandomCategoriesForPosts(randomCategoriesList);

        // Initialize likes and hasLiked for each post
        const initialLikes: Record<number, number> = {};
        const initialHasLiked: Record<number, boolean> = {};
        userPosts.forEach((post) => {
            initialLikes[post.id] = 0;
            initialHasLiked[post.id] = false;
        });
        setPostLikes(initialLikes);
        setHasLiked(initialHasLiked);
        }
    }, [userPosts.length]);

    function toggleLike(postId: number) {
        setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: hasLiked[postId] ? prevLikes[postId] - 1 : prevLikes[postId] + 1,
        }));
        setHasLiked((prevHasLiked) => ({
        ...prevHasLiked,
        [postId]: !prevHasLiked[postId],
        }));
    }

  return (
    <>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:grid-cols-1 space-x-4 space-y-2">
        {userPosts?.map((post, index) => (
            <div key={post.id} className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-lg hover:shadow-xl transition duration-300">
                <Card className="px-4 py-12">
                    <Card.Text className="text-[14pt]">{randomCategoriesForPosts[index]}</Card.Text>
                    <Card.Title className="text-[20pt] font-extrabold font-['Bitter']">
                    {post.title.substring(0, 30)}...
                    </Card.Title>
                    <Card.Text>{post.body.substring(0, 100)}...</Card.Text>
                </Card>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-40 transition duration-300"></div>
                <div className="absolute flex justify-between inset-0 top-[77%] mx-4 opacity-0 group-hover:opacity-100 text-white">
                    <div className="flex items-center space-x-2">
                        <img src={default_pfp} alt="user pfp" className="w-10 h-10" />
                        <p>{user.username}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                            <button onClick={() => toggleLike(post.id)}>
                            {!hasLiked[post.id] ? <img src={unliked_heart} alt="heart" className="w-6 h-6" /> : <img src={liked_heart} alt="heart" className="w-6 h-6" />}
                            </button>
                            <p>{postLikes[post.id]}</p>
                        </div>

                        <div className="flex space-x-2">
                            <img src={comment_icon} alt="comment icon" className="w-6 h-6" />
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    </>
  );
}

export default ListOfPosts;
