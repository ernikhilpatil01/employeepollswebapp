import {connect} from "react-redux";
import Card from "./Card";
import { useState } from "react";

/**
* @description Represents Dashboard
* @constructor
* @param authedUser represents authorized user to open dashboard perfrom actions
* @param questions represents questions which includes answered and unanswered
* @param users represents all the users
*/
const Dashboard = ({authedUser, questions, users}) => {

    const [displayUnanswered, setDisplayUnanswered] = useState(true);

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));
    const handleToggle = () => {
        setDisplayUnanswered (displayUnanswered => !displayUnanswered);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9" data-testid="heading">Welcome!</h1>
                <span style={{display: "flex"}} className="content-end justify-end"><button onClick={handleToggle}>Toggle Polls</button></span>
            <div>
                { displayUnanswered ? 
                    <div>
                        <h2 className="text-2xl font-bold mt-6 text-center">Unanswered</h2>
                        <div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions
                                    .filter(unanswered)
                                    .map((question) => (
                                        <li key={question.id}>
                                            <Card question={question} author={users[question.author]}/>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    :
                    <div>
                        <h2 className="text-2xl font-bold mt-6 bg-green-500 text-center">Answered</h2>
                        <div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions
                                    .filter(answered)
                                    .map((question) => (
                                        <li key={question.id}>
                                            <Card question={question} author={users[question.author]}/>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users
});

export default connect(mapStateToProps)(Dashboard);
