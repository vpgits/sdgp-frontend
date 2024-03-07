
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component()
async function fetchScores() {
  let scoreData = [];

  const { data: data1, error: error1 } = await supabase
    .from("quiz")
    .select(`scores, user_id`)
    .eq("id", quizId)
    .order("scores", { ascending: false });

  if (data1) {
    scoreData.push(...data1);
  }

  const { data: data2, error: error2 } = await supabase
    .from("quiz")
    .select(`scores, user_id`)
    .eq("parent_id", quizId)
    .order("scores", { ascending: false });

  if (data2) {
    scoreData.push(...data2);
  }

  return scoreData;
}

const scores = await fetchScores();
console.log(scores); {
  return (
    <div className="flex justify-center"> 
    <Card className="w-full max-w-3xl border-4 p-4">
      <div className="flex justify-center">
      <CardHeader className="pb-6">
        <CardTitle>Quiz Leaderboard</CardTitle>
        <CardDescription>Top scores of participants.</CardDescription>
      </CardHeader>
      </div>
      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-8">1</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpghttps://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Ella Johnson</div>
            </div>
            <div className="ml-auto font-semibold">1000</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">2</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Noah Williams</div>
            </div>
            <div className="ml-auto font-semibold">950</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">3</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Ava Brown</div>
            </div>
            <div className="ml-auto font-semibold">900</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">4</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Liam Jones</div>
            </div>
            <div className="ml-auto font-semibold">850</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">5</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Olivia Garcia</div>
            </div>
            <div className="ml-auto font-semibold">800</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">6</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Lucas Rodriguez</div>
            </div>
            <div className="ml-auto font-semibold">750</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">7</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Sophia Martinez</div>
            </div>
            <div className="ml-auto font-semibold">700</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">8</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Mia Hernandez</div>
            </div>
            <div className="ml-auto font-semibold">650</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">9</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Benjamin Lopez</div>
            </div>
            <div className="ml-auto font-semibold">600</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8">10</div>
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="font-semibold">Charlotte Smith</div>
            </div>
            <div className="ml-auto font-semibold">550</div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
