package com.growts.grivi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.growts.grivi.web.rest.TestUtil;

public class ChannelSubscriptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChannelSubscription.class);
        ChannelSubscription channelSubscription1 = new ChannelSubscription();
        channelSubscription1.setId(1L);
        ChannelSubscription channelSubscription2 = new ChannelSubscription();
        channelSubscription2.setId(channelSubscription1.getId());
        assertThat(channelSubscription1).isEqualTo(channelSubscription2);
        channelSubscription2.setId(2L);
        assertThat(channelSubscription1).isNotEqualTo(channelSubscription2);
        channelSubscription1.setId(null);
        assertThat(channelSubscription1).isNotEqualTo(channelSubscription2);
    }
}
