

export default function About() {
    return (
        <>
            <div className="container mx-auto px-4  space-y-6">
                <h1>About</h1>
                <p className="indent-8">
                    I've decided to build out my commission tracker, a straightforward way to bridge the gap between employees and managers who need to communicate about sales made in the field, that has previously been filled by either expensive software, or paper commission sheets.
                </p>
                <p>
                    Why did I set out to make this?
                </p>
                <p className="indent-8">
                    Besides I thought it would be fun?
                    Because a simple but modern solution to this problem I personally have experienced in my 15+ years as an HVAC technician needed to be made. There are other solutions to this problem, that all have their drawbacks:
                </p>
                <ul className="list-disc px-12 mx-2 border rounded-lg">
                    <li>Paper commission sheets get lost, ruined, or misplaced, and have no backup once made.</li>
                    <li>Sales tracking software can be expensive or difficult to use. Not to mention adding more cognitive load and work just to track a sale. (Not every user is a salesman, which would justify these things)</li>
                    <li>The sales tracking components of popular dispatch software is sometimes difficult for managers to rely on, as the "sale" of a repair, which may not be commissioned, is tracked alongside and equal to a "sale" of an "upsell", which would be.</li>
                    <li>Or worse, which was my most recent experience, the company used a popular dispatch software for service work, but corporate used a totally different software for sales, which were not compatible, requiring them to bridge the gap with paper commission sheets.</li>
                </ul>
                
                <p className="indent-8">
                    What I'm building is intended to solve the above problems, with a focus on the trades, and smaller companies who do not, or more often cannot, spend a lot of money on something that could be solved with a piece of paper, but still wish to modernize their workflow.
                </p>
            </div>
        </>
    );
}
