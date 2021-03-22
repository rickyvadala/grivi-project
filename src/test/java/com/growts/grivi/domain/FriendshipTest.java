package com.growts.grivi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.growts.grivi.web.rest.TestUtil;

public class FriendshipTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Friendship.class);
        Friendship friendship1 = new Friendship();
        friendship1.setId(1L);
        Friendship friendship2 = new Friendship();
        friendship2.setId(friendship1.getId());
        assertThat(friendship1).isEqualTo(friendship2);
        friendship2.setId(2L);
        assertThat(friendship1).isNotEqualTo(friendship2);
        friendship1.setId(null);
        assertThat(friendship1).isNotEqualTo(friendship2);
    }
}
