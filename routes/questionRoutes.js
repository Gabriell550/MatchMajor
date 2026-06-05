//API Questions
app.get('/questions', async (req, res) => {
    try {

        const questions = await Question.find();

        res.json({
            success: true,
            total: questions.length,
            data: questions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

//API Add Question
app.post('/questions', async (req, res) => {
  try {

    const newQuestion = await Question.create(req.body);

    res.json({
      success: true,
      data: newQuestion
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});