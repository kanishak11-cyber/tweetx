export async function GET(req) {
    try {
        const { id } = req.params;
        const tweet = await prisma.tweet.findUnique({
        where: {
            id: id,
        }
        });
        return new NextResponse(JSON.stringify(tweet), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong.", {
        status: 500
        });
    }
    }