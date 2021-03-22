package com.growts.grivi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.growts.grivi.web.rest.TestUtil;

public class ReviewDetTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReviewDet.class);
        ReviewDet reviewDet1 = new ReviewDet();
        reviewDet1.setId(1L);
        ReviewDet reviewDet2 = new ReviewDet();
        reviewDet2.setId(reviewDet1.getId());
        assertThat(reviewDet1).isEqualTo(reviewDet2);
        reviewDet2.setId(2L);
        assertThat(reviewDet1).isNotEqualTo(reviewDet2);
        reviewDet1.setId(null);
        assertThat(reviewDet1).isNotEqualTo(reviewDet2);
    }
}
