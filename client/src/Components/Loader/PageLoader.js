/**
 * Loader Component
 * This will pop up while making API calls
 */
function PageLoader () {
    return (
        <div className="loader h-100 appBackgroundColor">
            <div className="container-fluid h-100">
                <div className="row h1 h-100 text-white align-content-center justify-content-center">
                    <b>Loading...</b>
                </div>
            </div>
        </div>
    );
}

export default PageLoader;