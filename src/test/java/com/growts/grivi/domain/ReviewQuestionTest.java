package com.growts.grivi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.growts.grivi.web.rest.TestUtil;

public class ReviewQuestionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReviewQuestion.class);
        ReviewQuestion reviewQuestion1 = new ReviewQuestion();
        reviewQuestion1.setId(1L);
        ReviewQuestion reviewQuestion2 = new ReviewQuestion();
        reviewQuestion2.setId(reviewQuestion1.getId());
        assertThat(reviewQuestion1).isEqualTo(reviewQuestion2);
        reviewQuestion2.setId(2L);
        assertThat(reviewQuestion1).isNotEqualTo(reviewQuestion2);
        reviewQuestion1.setId(null);
        assertThat(reviewQuestion1).isNotEqualTo(reviewQuestion2);
    }
}
